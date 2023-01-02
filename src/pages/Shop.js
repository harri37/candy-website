import React from "react";

const Shop = () => {
  return <><div id='collection-component-1672567339158'></div> 
  <script type="text/javascript">
  /*<![CDATA[*/
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'candy-store-6532.myshopify.com',
        storefrontAccessToken: '2700dd220426524fdbcf65573afcaad4',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('collection', {
          id: '431238545690',
          node: document.getElementById('collection-component-1672567339158'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
    "product": {
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "calc(25% - 20px)",
            "margin-left": "20px",
            "margin-bottom": "50px",
            "width": "calc(25% - 20px)"
          },
          "img": {
            "height": "calc(100% - 15px)",
            "position": "absolute",
            "left": "0",
            "right": "0",
            "top": "0"
          },
          "imgWrapper": {
            "padding-top": "calc(75% + 15px)",
            "position": "relative",
            "height": "0"
          }
        },
        "title": {
          "font-family": "Quantico, sans-serif",
          "color": "#000000"
        },
        "button": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#ea343a",
          ":hover": {
            "color": "#ea343a",
            "background-color": "#e6e6e6"
          },
          "background-color": "#ffffff",
          ":focus": {
            "background-color": "#e6e6e6"
          },
          "border-radius": "0px",
          "padding-left": "11px",
          "padding-right": "11px"
        },
        "price": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#000000"
        },
        "compareAt": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#000000"
        },
        "unitPrice": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#000000"
        }
      },
      "buttonDestination": "modal",
      "contents": {
        "options": false
      },
      "text": {
        "button": "View product"
      },
      "googleFonts": [
        "Quantico"
      ]
    },
    "productSet": {
      "styles": {
        "products": {
          "@media (min-width: 601px)": {
            "margin-left": "-20px"
          }
        }
      }
    },
    "modalProduct": {
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "button": false,
        "buttonWithQuantity": true
      },
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "0px",
            "margin-bottom": "0px"
          }
        },
        "button": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#ea343a",
          ":hover": {
            "color": "#ea343a",
            "background-color": "#e6e6e6"
          },
          "background-color": "#ffffff",
          ":focus": {
            "background-color": "#e6e6e6"
          },
          "border-radius": "0px",
          "padding-left": "11px",
          "padding-right": "11px"
        },
        "title": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "font-size": "26px",
          "color": "#ffffff"
        },
        "price": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "font-size": "18px",
          "color": "#ffffff"
        },
        "compareAt": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "font-size": "15.299999999999999px",
          "color": "#ffffff"
        },
        "unitPrice": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "font-size": "15.299999999999999px",
          "color": "#ffffff"
        },
        "description": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#ffffff"
        }
      },
      "googleFonts": [
        "Quantico"
      ]
    },
    "modal": {
      "styles": {
        "modal": {
          "background-color": "#971f27"
        }
      }
    },
    "option": {
      "styles": {
        "label": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold"
        },
        "select": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold"
        }
      },
      "googleFonts": [
        "Quantico"
      ]
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "color": "#ea343a",
          ":hover": {
            "color": "#ea343a",
            "background-color": "#e6e6e6"
          },
          "background-color": "#ffffff",
          ":focus": {
            "background-color": "#e6e6e6"
          },
          "border-radius": "0px"
        },
        "title": {
          "color": "#ffffff"
        },
        "header": {
          "color": "#ffffff"
        },
        "lineItems": {
          "color": "#ffffff"
        },
        "subtotalText": {
          "color": "#ffffff"
        },
        "subtotal": {
          "color": "#ffffff"
        },
        "notice": {
          "color": "#ffffff"
        },
        "currency": {
          "color": "#ffffff"
        },
        "close": {
          "color": "#ffffff",
          ":hover": {
            "color": "#ffffff"
          }
        },
        "empty": {
          "color": "#ffffff"
        },
        "noteDescription": {
          "color": "#ffffff"
        },
        "discountText": {
          "color": "#ffffff"
        },
        "discountIcon": {
          "fill": "#ffffff"
        },
        "discountAmount": {
          "color": "#ffffff"
        },
        "cart": {
          "background-color": "#ea343a"
        },
        "footer": {
          "background-color": "#ea343a"
        }
      },
      "text": {
        "total": "Subtotal",
        "button": "Checkout"
      },
      "popup": false,
      "googleFonts": [
        "Quantico"
      ]
    },
    "toggle": {
      "styles": {
        "toggle": {
          "font-family": "Quantico, sans-serif",
          "font-weight": "bold",
          "background-color": "#ffffff",
          ":hover": {
            "background-color": "#e6e6e6"
          },
          ":focus": {
            "background-color": "#e6e6e6"
          }
        },
        "count": {
          "color": "#ea343a",
          ":hover": {
            "color": "#ea343a"
          }
        },
        "iconPath": {
          "fill": "#ea343a"
        }
      },
      "googleFonts": [
        "Quantico"
      ]
    },
    "lineItem": {
      "styles": {
        "variantTitle": {
          "color": "#ffffff"
        },
        "title": {
          "color": "#ffffff"
        },
        "price": {
          "color": "#ffffff"
        },
        "fullPrice": {
          "color": "#ffffff"
        },
        "discount": {
          "color": "#ffffff"
        },
        "discountIcon": {
          "fill": "#ffffff"
        },
        "quantity": {
          "color": "#ffffff"
        },
        "quantityIncrement": {
          "color": "#ffffff",
          "border-color": "#ffffff"
        },
        "quantityDecrement": {
          "color": "#ffffff",
          "border-color": "#ffffff"
        },
        "quantityInput": {
          "color": "#ffffff",
          "border-color": "#ffffff"
        }
      }
    }
  },
        });
      });
    }
  })();
  /*]]>*/
  </script>
  </>;
};

export default Shop;
