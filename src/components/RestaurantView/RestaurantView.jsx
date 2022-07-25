import React from 'react';
import { useParams } from 'react-router-dom';
import { Link as ScollTo } from 'react-scroll';
import Rating from "react-rating"
import data from '../data.json';
import './RestaurantView.css';

export default function RestaurantView() {
  {/* The JSON variable from the api to display the menu from the given restaurant id */}
  const restaurantInfo = data.response.result.restaurant_info;
  const cuisine = data.response.result.environment_info.cuisine_type_primary;
  const menus = data.response.result.menus
  
  return (
    <div className="grid">
      <div className="restaurant-view">
        {/* Restauant Header */}
        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" className="banner"/>
        <div>
          <h1>{restaurantInfo.restaurant_name}</h1>
          <p>{restaurantInfo.brief_description}</p>
          <Rating fractions={2} readonly/>
        </div>
        <div className="info">
          {/* Restauant Info */}
          <p>Address: {restaurantInfo.address_1}, {restaurantInfo.city_town}, {restaurantInfo.state_province}, {restaurantInfo.postal_code}</p>
          <p>Phone: {restaurantInfo.phone}</p>
          <p>{cuisine}</p>
        </div>
        <div className="menu">
          {/* Maps the menus */}
          {menus.map(menu => {
            return <Menu info={menu} />
          })}
        </div>
      </div>
      <div className="menu-box">
          {menus.map(menu => {
            return (
              <div>
                <h2>{menu.menu_name}</h2>
                {menu.menu_groups.map(group => {
                  return (
                    <ScollTo to={group.group_name} smooth={true} duration={250} offset={-25}>
                      <p>{group.group_name}</p>
                    </ScollTo>
                  )
                })}
              </div>
            )
          })}
        </div>
    </div>
  );
}

export function Menu(props) {
  return (
    <>
      <h1>{props.info.menu_name}</h1>
      {/* Display the menu groups */}
      {props.info.menu_groups.map(group => {
        return <MenuGroup group={group} />
      })}
    </>
  )
}

export function MenuGroup(props) {
  return (
    <div id={props.group.group_name}>
      <h2>{props.group.group_name}</h2>
      {/* Display the menu items */}
      {props.group.menu_items.map(item => {
        return <Item item={item}/>
      })}
    </div>
  )
}

export function Item(props) {
  return (
    <div className="item">
      <h3>{props.item.menu_item_name}</h3>
      <p>{props.item.menu_item_description ? props.item.menu_item_description : 'N/A'}</p>
      <Rating fractions={2} readonly/>
    </div>
  )
}
