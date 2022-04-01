import PageNavbar from './PageNavbar';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <PageNavbar />
      <div className={classes.occupy}></div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
