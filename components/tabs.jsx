import { Container, Tab, Tabs, TabList } from 'bloomer';
import { Link } from 'react-router-dom';
import * as React from 'react';
import PropTypes from 'prop-types';

const MenuItem = props => (
  <Tab isActive={props.active}>
    <Link to={props.link}>
      {props.name}
    </Link>
  </Tab>
);

MenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const MenuItems = (menuConfig, location) => (
  menuConfig.map(subMenu => (
    <MenuItem
      active={subMenu.link === location}
      link={subMenu.link}
      name={subMenu.name}
    />
  ))
);

const Menu = props => (
  <Tabs isBoxed isFullWidth>
    <Container isFullWidth>
      <TabList>
        {MenuItems(props.config, props.location.pathname)}
      </TabList>
    </Container>
  </Tabs>
);

Menu.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Menu.defaultProps = {
  config: [
    {
      name: '1. Abfrage',
      link: '/',
    },
    {
      name: '2. Abfrage',
      link: '/category',
    },
    {
      name: '3.Abfrage',
      link: '/task/1',
    },
  ],
};

export default Menu;
