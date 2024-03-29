import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cities from "../india-cities";
import TextField from "@material-ui/core/TextField";
import { geocode, getImage } from "../apiAccess";

class CityAutocomplete extends React.Component {
  ref = React.createRef();
  callApis = event => {
    const city = this.ref.current.value;
    event.preventDefault();
    if (!this.props.cities.includes(city)) {
      this.props.addCity(city);
      this.props.handleImageIndexes(city);
      getImage(city, this.props.setCityImage);
      geocode(city, this.props.setCityWeather);
    } else alert("City already added!");
  };
  render() {
    return (
      <form onSubmit={this.callApis}>
        <Autocomplete
          id="grouped-demo"
          freeSolo={true}
          options={Object.keys(cities)}
          clearOnEscape={true}
          style={{ width: 300, margin: 10 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Add City"
              inputRef={this.ref}
              variant="outlined"
            />
          )}
        />
      </form>
    );
  }
}

export default CityAutocomplete;
