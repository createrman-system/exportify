import './App.scss'
import "./icons"

import React, { useEffect, useState, useRef } from 'react'
import { useTranslation, Translation, Trans } from "react-i18next"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "url-search-params-polyfill"

import Login from 'components/Login'
import PlaylistTable from "components/PlaylistTable"
import TopMenu from "components/TopMenu"
import { loadAccessToken, exchangeCodeForToken } from "auth"

function App() {
  useTranslation()
  const [subtitle, setSubtitle] = useState(<Translation>{(t) => t("tagline")}</Translation>)
  const searchParams = new URLSearchParams(window.location.search)

  const [accessToken, setAccessToken] = useState<string | null>(loadAccessToken())
  const hasProcessedCode = useRef(false)

  let view

  const onSetSubtitle = (subtitle: any) => {
    setSubtitle(subtitle)
  }

  useEffect(() => {
    const code = searchParams.get("code")
    if (!code) { return }

    // Prevent multiple executions in StrictMode or re-renders
    if (hasProcessedCode.current) {
      return
    }
    hasProcessedCode.current = true

    exchangeCodeForToken(code).then((accessToken) => {
      setAccessToken(accessToken)

      // Remove code from query string
      window.history.replaceState({}, document.title, window.location.pathname)
    })
  })

  if (searchParams.get('spotify_error')) {
    view = <div id="spotifyErrorMessage" className="lead">
      <p><FontAwesomeIcon icon={['fas', 'bolt']} style={{ fontSize: "50px", marginBottom: "20px" }} /></p>
      <p><Translation>{(t) => t("error.spotify.message")}</Translation></p>
      <p style={{ marginTop: "50px" }}><Trans i18nKey="error.spotify.status_link" components={{ a_status: <a target="_blank" rel="noreferrer" href="https://status.spotify.dev/" />, a_retry: <a rel="noreferrer" href="?" /> }} /></p>
    </div>
  } else if (accessToken) {
    view = <PlaylistTable accessToken={accessToken!} onSetSubtitle={onSetSubtitle} />
  } else {
    view = <Login />
  }

  return (
    <div className="App container" style={{ paddingBottom: '100px' }}>
      <header className="App-header">
        <div className="d-sm-none d-block mb-5" />
        <TopMenu loggedIn={!!accessToken} />
        <h1>
          <FontAwesomeIcon icon={['fab', 'spotify']} color="#84BD00" size="sm" /> <a href={process.env.PUBLIC_URL}>Exportify</a>
        </h1>

        <p id="subtitle" className="lead text-secondary">{subtitle}</p>
      </header>

      {view}

      <div id="global-download-container" />
    </div>
  );
}

export default App;
