import "./NavBarItem.scss"

const NavBarItem = ({label}) => {
    return (
        <li>
            <button className="navbar__item">{label}</button>
        </li>
    );
}
 
export default NavBarItem;