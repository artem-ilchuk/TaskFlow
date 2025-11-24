const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/" className="cursor-pointer" aria-label="Go to home page">
          <svg className="w-16 h-16">
            <use href="/sprite.svg#icon-Logo" />
          </svg>
        </NavLink>
        <div>
          <p className="flex-col gap-2">Task Flow</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
