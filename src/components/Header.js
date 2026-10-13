function Header({ onTitleClick }) {
  return (
    <header>
      <h1 onClick={onTitleClick}>Worst Movie Search</h1>
      <p>Your favourite actors at their lowest ebb</p>
    </header>
  )
}

export default Header
