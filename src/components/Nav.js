import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';

const Navigation = () => {
    const navlist = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
            window.location.href='/';
        }},
        {label: 'Articles', icon: 'pi pi-fw pi-book', command: () => {
            window.location.href='/articles';
        }},
        {label: 'Categories', icon: 'pi pi-fw pi-palette',  command: () => {
            window.location.href='/categories';
        }}
      ]
    return(
        <div>
           <header>
              <nav>
                <ul>
                <Menubar
                  model={navlist}
                />
                </ul>
              </nav>
           </header>
        </div>
    )
}

export default Navigation;