export const MainLayoutContainer = (): JSX.Element => {
  return (
    <div className="main-layout-container">
      <header>header</header>
      <main>
        <aside className="side-menu-container">Side menu container</aside>
        <section className="main-content-container">
          Main Content container
        </section>
      </main>
    </div>
  );
};
