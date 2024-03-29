import React from "react";
import CityCard from "./CityCard";
import NavBar from "./NavBar";
import Grid from "@material-ui/core/Grid";
import SideDrawer from "./SideDrawer";

class App extends React.Component {
  state = {
    cities: [],
    weatherData: {},
    images: {},
    imageIndexes: {},
    drawer: false
  };
  componentDidMount() {
    const cities = localStorage.getItem("cities");
    const weatherData = localStorage.getItem("weatherData");
    const images = localStorage.getItem("images");
    const imageIndexes = localStorage.getItem("imageIndexes");
    if (cities) this.setState({ cities: JSON.parse(cities) });
    if (weatherData) this.setState({ weatherData: JSON.parse(weatherData) });
    if (images) this.setState({ images: JSON.parse(images) });
    if (imageIndexes) this.setState({ imageIndexes: JSON.parse(imageIndexes) });
  }

  componentDidUpdate() {
    localStorage.setItem("cities", JSON.stringify(this.state.cities));
    localStorage.setItem("weatherData", JSON.stringify(this.state.weatherData));
    localStorage.setItem("images", JSON.stringify(this.state.images));
    localStorage.setItem(
      "imageIndexes",
      JSON.stringify(this.state.imageIndexes)
    );
    Object.keys(this.state.images).forEach(city => {
      this.state.images[city].forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  }
  addCity = city => {
    const cities = [...this.state.cities];
    cities.push(city);
    this.setState({ cities });
  };
  setCityWeather = (city, weather) => {
    const weatherData = { ...this.state.weatherData };
    weatherData[city] = weather;
    this.setState({ weatherData });
  };
  setCityImage = (city, link) => {
    const images = { ...this.state.images };
    images[city] = link;
    this.setState({ images });
  };
  removeCity = city => {
    const cities = [...this.state.cities];
    const weatherData = { ...this.state.weatherData };
    const images = { ...this.state.images };
    const imageIndexes = { ...this.state.imageIndexes };

    const index = cities.indexOf(city);
    if (index > -1) {
      cities.splice(index, 1);
    }

    delete weatherData[city];
    delete images[city];
    delete imageIndexes[city];

    this.setState({ cities, weatherData, images, imageIndexes });
  };
  handleImageIndexes = city => {
    const imageIndexes = { ...this.state.imageIndexes };
    if (imageIndexes.hasOwnProperty(city))
      imageIndexes[city] =
        (imageIndexes[city] + 1) % this.state.images[city].length;
    else imageIndexes[city] = 0;
    this.setState({ imageIndexes });
  };
  toggleDrawer = () => {
    if (this.state.drawer) this.setState({ drawer: false });
    else this.setState({ drawer: true });
  };
  render() {
    return (
      <div>
        <NavBar toggleDrawer={this.toggleDrawer} />
        <SideDrawer
          drawer={this.state.drawer}
          toggleDrawer={this.toggleDrawer}
          cities={this.state.cities}
          weatherData={this.state.weatherData}
          addCity={this.addCity}
          setCityWeather={this.setCityWeather}
          setCityImage={this.setCityImage}
          handleImageIndexes={this.handleImageIndexes}
        />
        <Grid container style={{ padding: 24 }}>
          {Object.keys(this.state.weatherData).map(key => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              key={key}
              style={{ padding: 5 }}
            >
              <CityCard
                index={key}
                history={this.props.history}
                setCityWeather={this.setCityWeather}
                weatherData={this.state.weatherData}
                removeCity={this.removeCity}
                images={this.state.images}
                imageIndexes={this.state.imageIndexes}
                handleImageIndexes={this.handleImageIndexes}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default App;
