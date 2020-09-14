class loadOn {
    constructor(url, sourceContainer, targetContainer, replace) {
        this.url = url;
        this.sourceContainer = sourceContainer;
        this.targetContainer = targetContainer;
        this.replace = replace;
    }

    load() {
        var xhr = new XMLHttpRequest();
        var url = this.url;
        var source = this.sourceContainer;
        var target = this.targetContainer;
        var replace = this.replace;
        xhr.onerror = function() {
            throw "Request failed. HTTP code " + xhr.status;
        };
        xhr.onload = function() {
            if (!xhr.status || xhr.status >= 400) {
                throw "Request failed. HTTP code " + xhr.status;
            }
            var temp = document.createElement("div");
            temp.innerHTML = xhr.responseText;
            var ele = temp.querySelector(source);
            //console.log(temp);

            if (ele) {
                if (replace) {
                    document.getElementById(target).innerHTML = ele.outerHTML;
                } else {
                    document.getElementById(target).appendChild(ele);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
}

class dinamicCss {
    constructor(id, href) {
        this.id = id;
        this.href = href;
    }
    create() {
        var id = this.id;
        var href = this.href;

        if (!document.getElementById(id)) {
            var head = document.getElementsByTagName("head")[0];
            var link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = href;
            link.media = "all";
            head.appendChild(link);
        }
    }
}
/*class dinamicJs {
  constructor(id, type, src) {
    this.id = id;
    this.type = type;
    this.src = src;
  }
  create() {
    var id = this.id;
    if (!document.getElementById(id)) {
      this.build();
    } else {
      this.destroy();
      setTimeout(() => {
        this.build();
      }, 500);
    }
  }
  build() {
    var id = this.id;
    var type = this.type;
    var src = this.src;

    var body = document.getElementsByTagName("body")[0];
    var script = document.createElement("script");
    script.id = id;
    script.type = type;
    script.src = src;
    body.appendChild(script);
  }
  destroy() {
    var id = this.id;
    var el = document.getElementById(id);
    el.parentNode.removeChild(el);
  }
}*/

class chartJs {
    constructor(id, type, label, data, beginAtZero, legend, verX, verY) {
        this.id = id; //string
        this.type = type; //string
        this.label = label;
        this.data = data; //string json
        this.beginAtZero = beginAtZero; //boolean
        this.legend = legend; //boolean
        this.verX = verX;
        this.verY = verY;
    }
    create() {
        //Parámetros del objeto
        var id = this.id;
        var type = this.type;
        var label = this.label;
        var data = this.data;
        var beginAtZero = this.beginAtZero;
        var legend = this.legend;
        var verX = this.verX;
        var verY = this.verY;

        //Variables extra
        var letter = "";
        var arrayData1 = [];
        var arrayData2 = [];

        //HTTPREQ PARA OBTENER EL ARCHIVO DE DATOS
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //response text es un texto de respuesta que consigue cuando hay datos
                //que recolectar de la ruta indicada
                var myObj = JSON.parse(this.responseText);
                letter = myObj.colors;
                //console.log(letter);
            }
        };
        xml.open("GET", data, true);
        xml.send();
        //FIN DEL HTTPREQ

        setTimeout(() => {
            function getData() {
                letter.forEach((color) => {
                    arrayData1.push(color["color"]);
                    arrayData2.push(color["value"]);
                });
            }
            getData();

            var ctx = document.getElementById(id);
            var myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: arrayData1,
                    datasets: [{
                        label: label,
                        data: arrayData2,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    }, ],
                },
                options: {
                    scales: {
                        xAxes: [{ display: verX }],
                        yAxes: [{
                            display: verY,
                            ticks: {
                                beginAtZero: beginAtZero,
                            },
                        }, ],
                    },
                    legend: {
                        display: legend,
                    },
                },
            });
            //console.log(letter["color"]);
        }, 500);
    }
}
export { loadOn, dinamicCss, chartJs };