// Class untuk mengelola data cuaca
class Weather {
  constructor(city) {
    this.apiKey = 'e859691140be45d5b88103042232106';
    this.city = city;
  }

  // Mengambil data cuaca dari API
  async getWeatherData() {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}`);
    const data = await response.json();
    return data;
  }

  // Menampilkan data cuaca ke dalam elemen HTML
  displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
      <h2>${data.location.name}</h2>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Condition: ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
    `;
  }
}

// Class untuk mengatur tampilan dan interaksi
class UI {
  constructor() {
    this.searchBtn = document.getElementById('search-btn');
    this.cityInput = document.getElementById('city-input');
    this.weather = new Weather('');

    this.searchBtn.addEventListener('click', () => this.searchWeather());
  }

  // Mengambil input kota dari pengguna dan menampilkan data cuaca
  searchWeather() {
    const city = this.cityInput.value.trim();
    if (city !== '') {
      this.weather.city = city;
      this.weather.getWeatherData()
        .then(data => this.weather.displayWeatherInfo(data))
        .catch(error => console.log(error));
    }
  }
}

// Membuat instance dari UI
const ui = new UI();