import { useCallback, useEffect, useRef, useState } from 'react'
import { getSaved } from './propertyFilters'

/** Tiny data hook: const { data, loading, error, reload } = useData(() => db.publishedProperties(), []) */
export function useData(fn, deps = [], initial = null) {
  const [state, setState] = useState({ data: initial, loading: true, error: null })
  const fnRef = useRef(fn); fnRef.current = fn
  const [tick, setTick] = useState(0)
  useEffect(() => {
    let live = true
    setState((s) => ({ ...s, loading: true, error: null }))
    Promise.resolve()
      .then(() => fnRef.current())
      .then((data) => live && setState({ data, loading: false, error: null }))
      .catch((error) => { console.error(error); live && setState((s) => ({ ...s, loading: false, error })) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])
  const reload = useCallback(() => setTick((t) => t + 1), [])
  return { ...state, reload }
}

export function useSaved() {
  const [saved, setSaved] = useState(getSaved)
  useEffect(() => {
    const on = (e) => setSaved(e.detail || getSaved())
    window.addEventListener('forme:saved', on)
    return () => window.removeEventListener('forme:saved', on)
  }, [])
  return saved
}

export function useDocumentTitle(title) {
  useEffect(() => { if (title) document.title = `${title} — FORME REALTY` }, [title])
}
