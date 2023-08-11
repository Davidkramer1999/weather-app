export function getBackgroundImageClass(weatherImage: string) {
    switch (weatherImage) {
      case "Clouds":
        return "clouds background";
      case "Rain":
        return "rain background";
      case "Snow":
        return "snow background";
      case "Mist":
        return "snow background";
      case "Clear":
        return "clear background";
      case "Fog":
        return "fog background";
      default:
        return "clouds background";
    }
  }