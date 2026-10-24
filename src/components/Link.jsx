import { forwardRef } from 'react'
import { Link as RLink, NavLink as RNavLink } from 'react-router-dom'
import { useTransition } from './PageTransition'

const plainClick = (e, target) => e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === '_blank'

/** Drop-in for react-router's Link that plays the page-transition curtain. */
export const Link = forwardRef(function Link({ to, onClick, children, ...rest }, ref) {
  const { go } = useTransition()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || !go || plainClick(e, rest.target)) return
    e.preventDefault()
    go(to)
  }
  return <RLink ref={ref} to={to} onClick={handle} {...rest}>{children}</RLink>
})

export const NavLink = forwardRef(function NavLink({ to, onClick, children, ...rest }, ref) {
  const { go } = useTransition()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || !go || plainClick(e, rest.target)) return
    e.preventDefault()
    go(to)
  }
  return <RNavLink ref={ref} to={to} onClick={handle} {...rest}>{children}</RNavLink>
})

export default Link
