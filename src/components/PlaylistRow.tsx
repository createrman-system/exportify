import React from "react"
import ReactDOM from "react-dom"
import { withTranslation, WithTranslation } from "react-i18next"
import { Button, ProgressBar, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { apiCallErrorHandler } from "helpers"
import PlaylistExporter from "./PlaylistExporter"

interface PlaylistRowProps extends WithTranslation {
  accessToken: string,
  key: string,
  playlist: any,
  config: any
}

const GlobalDownloadProgress = ({ progress, message, playlistName, t }: { progress: number, message: string, playlistName: string, t: any }): any => {
  const container = document.getElementById('global-download-container');
  if (!container) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      zIndex: 1050,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontSize: '14px' }}>{t('playlist.downloading', { playlistName })}</Card.Title>
          <ProgressBar now={progress} label={`${progress}%`} animated striped />
          <Card.Text style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {message}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>,
    container
  );
};

class PlaylistRow extends React.Component<PlaylistRowProps> {
  state = {
    exporting: false,
    downloading: false,
    downloadProgress: 0,
    downloadMessage: ""
  }

  exportPlaylist = () => {
    this.setState(
      { exporting: true },
      () => {
        (new PlaylistExporter(
          this.props.accessToken,
          this.props.playlist,
          this.props.config
        )).export().catch(apiCallErrorHandler).then(() => {
          this.setState({ exporting: false })
        })
      }
    )
  }

  downloadMusic = () => {
    const { t } = this.props;
    this.setState({ downloading: true, downloadProgress: 0, downloadMessage: t("playlist.preparing_download") })

    const exporter = new PlaylistExporter(
      this.props.accessToken,
      this.props.playlist,
      this.props.config
    )

    exporter.csvData().then(csvData => {
      const blob = new Blob([csvData], { type: "text/csv" })
      const formData = new FormData()
      formData.append('csv', blob, 'playlist.csv')

      fetch('http://localhost:3001/download-music', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        console.log("Fetch connection established");

        const read = () => {
          reader?.read().then(({ done, value }) => {
            if (done) {
              console.log("Stream finished");
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            console.log("Received chunk:", chunk);
            const lines = chunk.split('\n');
            lines.forEach(line => {
              if (line.trim().startsWith('data: ')) {
                const jsonStr = line.trim().substring(6);
                try {
                  const data = JSON.parse(jsonStr);
                  console.log("Parsed data:", data);
                  if (data.status === 'processing' || data.status === 'success') {
                    const progress = Math.round((data.track_index / data.total_tracks) * 100);
                    this.setState({ downloadProgress: progress, downloadMessage: data.message });
                  } else if (data.status === 'archived') {
                    this.setState({ downloadProgress: 100, downloadMessage: t("playlist.finishing_download") });
                    setTimeout(() => this.setState({ downloading: false }), 5000);
                    window.location.href = `http://localhost:3001/get-zip/${data.zipPath}`;
                  } else if (data.status === 'completed') {
                    this.setState({ downloadMessage: data.message });
                  } else if (data.status === 'error' || data.status === 'warning') {
                    this.setState({ downloadMessage: data.message });
                    if (data.status === 'error') {
                       console.error("Download error:", data.message);
                    }
                  }
                } catch (e) {
                  console.error("Failed to parse JSON from line:", line, e);
                }
              }
            });
            read();
          });
        }
        read();
      }).catch(err => {
        console.error("Fetch error:", err);
        this.setState({ downloading: false, downloadMessage: `Fetch error: ${err.message}` })
        apiCallErrorHandler(err)
      })
    }).catch(err => {
      console.error("Error generating CSV data:", err);
      this.setState({ downloading: false, downloadMessage: t("playlist.error_preparing_csv") });
      apiCallErrorHandler(err);
    })
  }

  renderTickCross(condition: boolean) {
    if (condition) {
      return <FontAwesomeIcon icon={['far', 'check-circle']} size="sm" />
    } else {
      return <FontAwesomeIcon icon={['far', 'times-circle']} size="sm" className="opacity-25" />
    }
  }

  renderIcon(playlist: any) {
    if (playlist.name === 'Liked') {
      return <FontAwesomeIcon icon={['far', 'heart']} style={{ color: 'red' }} />;
    } else {
      return <FontAwesomeIcon icon={['fas', 'music']} />;
    }
  }

  render() {
    let playlist = this.props.playlist
    const { t } = this.props;
    const icon = ['fas', (this.state.exporting ? 'sync' : 'download')]

    if (playlist.uri == null) return (
      <tr key={this.props.key}>
        <td>{this.renderIcon(playlist)}</td>
        <td>{playlist.name}</td>
        <td className="d-none d-sm-table-cell" colSpan={2}>{t("playlist.not_supported")}</td>
        <td className="d-none d-sm-table-cell">{this.renderTickCross(playlist.public)}</td>
        <td className="d-none d-md-table-cell">{this.renderTickCross(playlist.collaborative)}</td>
        <td>&nbsp;</td>
      </tr >
    );

    return (
      <tr key={this.props.key}>
        {this.state.downloading && (
          <GlobalDownloadProgress
            progress={this.state.downloadProgress}
            message={this.state.downloadMessage}
            playlistName={this.props.playlist.name}
            t={t}
          />
        )}
        <td>{this.renderIcon(playlist)}</td>
        <td><a href={playlist.uri}>{playlist.name}</a></td>
        <td><a href={playlist.owner.uri}>{playlist.owner.display_name}</a></td>
        <td className="d-none d-sm-table-cell">{playlist.tracks.total}</td>
        <td className="d-none d-sm-table-cell">{this.renderTickCross(playlist.public)}</td>
        <td className="d-none d-md-table-cell">{this.renderTickCross(playlist.collaborative)}</td>
        <td className="text-end">
          {/* @ts-ignore */}
          <Button type="submit" variant="primary" size="sm" onClick={this.exportPlaylist} disabled={this.state.exporting} className="text-nowrap me-1">
            {/* @ts-ignore */}
            <FontAwesomeIcon icon={icon} size="sm" spin={this.state.exporting} /> {t("playlist.export_csv")}
          </Button>
          <Button variant="success" size="sm" onClick={this.downloadMusic} disabled={this.state.downloading} className="text-nowrap">
            <FontAwesomeIcon icon={['fas', 'music']} size="sm" spin={this.state.downloading} /> {t("playlist.download_music")}
          </Button>
        </td>
      </tr>
    );
  }
}

export default withTranslation()(PlaylistRow)
