import * as React from 'react';

import CITIES from './cities.json';
import "./map.scss";

function ControlPanel(props) {
  return (
    <div className="cities">
      <div className="cities-main">
        <h1 className="cities-main--title">Stores</h1>
        {CITIES.map((city, index) => (
          <div key={`btn-${index}`} className="cities-main--city">
            <input
              className="cities-main--city__input"
              type="radio"
              name="city"
              id={`city-${index}`}
              defaultChecked={city.city === 'Hyderabad'}
              onClick={() => props.onSelectCity(city)}
            />
            <label className="cities-main--city__label" htmlFor={`city-${index}`}>{city.city}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
