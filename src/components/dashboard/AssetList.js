import './asset-list.css';
import React, { useContext } from 'react';
import AppContext from '../../AppContext';

const AssetList = () => {
  const { assets, userPreferences } = useContext(AppContext);

  const getUserConfiguredFields = () => {
    if (!userPreferences || !userPreferences.homeConfiguration || !userPreferences.homeConfiguration.fields) {
      return [];
    }

    return userPreferences.homeConfiguration.fields.map((field) => field.fieldId);
  };

  const userConfiguredFields = getUserConfiguredFields();

  return (
    <div className="asset-list-container">
      <h2>Asset List</h2>
      <div className="asset-list">
        {assets.map((asset) => (
          <div key={asset.id} className="asset-item">
            <div className="row">
              <div className="label">Name</div>
              <div className="value">{asset.name}</div>
            </div>
            <div className="row">
              <div className="label">Active</div>
              <div className="value">{asset.active.toString()}</div>
            </div>
            <div className="row">
              <div className="label">Asset Type</div>
              <div className="value">{asset.assetType.name}</div>
            </div>
            {/* Render user-configured fields here */}
            {userConfiguredFields.map((fieldId) => {
              const property = asset.properties.find((prop) => prop.id === fieldId);
              const parameter = asset.parameters.find((param) => param.id === fieldId);

              if (property) {
                return (
                  <div key={fieldId} className="row">
                    <div className="label">{property.name}</div>
                    <div className="value">{property.value}</div>
                  </div>
                );
              }

              if (parameter) {
                return (
                  <div key={fieldId} className="row">
                    <div className="label">{parameter.name}</div>
                    {/* Value of parameters will come from signalr later */}
                    <div className="value">{'Value from SignalR'}</div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;
