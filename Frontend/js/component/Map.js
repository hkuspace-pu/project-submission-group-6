export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      map: null,
      // 預設經緯度在信義區附近
      lat: 22.3526401,
      lng: 113.9628898,
      allPost: null,
    }
  },
  methods: {
    initMap() {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new google.maps.Map(document.getElementById("map"), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 10,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      });
    },
    // 建立地標
    setMarker() {
      console.log('marker: ', this.allPost);
      for (let i = 0; i < this.allPost.length; i++) {
        const marker = new google.maps.Marker({

          position: { lat: this.allPost[i].lat, lng: this.allPost[i].lng },

          map: this.map
        });

        let bird = this.allPost[i].common_name;

        let birdCount = this.allPost.filter(b => b.lat == this.allPost[i].lat && b.lng == this.allPost[i].lng).length

        const infowindow = new google.maps.InfoWindow({

          content: `
          <div id="content">
          <table class="table">
          <thead>
            <tr>
              <th scope="col">Bird</th>
              <th scope="col">Reported count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${bird}</td>
              <td>${birdCount}</td>
            </tr>
          </tbody>
        </table>
          </div>
        `,
          maxWidth: 200
        });

        marker.addListener("click", () => {
          infowindow.open(this.map, marker);
        });
      }
    },
    async getPost() {
      this.isLoading = true;

      const res = await fetch('http://localhost:5003/api/eBird/general_user/post');
      const res_data = await res.json();
      this.allPost = res_data;
      console.log('all post', this.allPost);

      this.isLoading = false;
    }
  },
  mounted() {
    /*
      google.charts.load('current', {
          'packages': ['map'],
          // Note: you will need to get a mapsApiKey for your project.
          // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
          'mapsApiKey': 'AIzaSyAKFb5CShOvM5g7mlVsbB3pd9RWcmFvaz8'
          
          });
          google.charts.setOnLoadCallback(drawMap);
      
          function drawMap() {
            var data = google.visualization.arrayToDataTable([
              ['Country', 'Birds'],
              ['Hong Kong', 'Japanese Quail: 12'],
            ]);
      
          var options = {
            showTooltip: true,
            showInfoWindow: true
          };
      
          var map = new google.visualization.Map(document.getElementById('chart_div'));
      
          map.draw(data, options);
        };*/
    this.initMap();
    this.getPost();
  },

  watch: {
    searchWord(nee, ddd) {
      console.log(nee);
    },
    allPost(n, o) {
      this.setMarker();
    }
  },

  template: `
    <div class="google-map" id="map"></div>
    `
}