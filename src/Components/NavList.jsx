import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavList = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' },
        { id: 2, name: 'Trash', icon: <Delete />, route: '/delete' },
    ]
    
    return (
        <List>
            {
                navList.map(list => (
                    <ListItem button key={list.id}>
                        <Link 
                            to={list.route}
                            style={{
                                textDecoration:'none',
                                display:'flex',
                                color:'inherit'

                          }}
                        >
                            <ListItemIcon style={{alignItems:'center'}}>
                                <div style={{ alignItems: 'center'}}>
                                    {list.icon}
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={list.name} />
                        </Link>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default NavList;
