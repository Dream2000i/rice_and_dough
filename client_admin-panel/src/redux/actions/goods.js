import axios from "axios";
import { backend_get_goods, writeResponse } from '../../backend.js';

export const setLoaded = payload => {
  return {
    type: 'SET_LOADED',
    payload
  }
}

export const fetchGoods = (category) => (dispatch) => {
  dispatch(setLoaded(false));
  axios.get(backend_get_goods)
    .then(resp => (writeResponse(resp.data)) ? dispatch(setGoods(resp.data.data)) : '');
}


const optionsCategory = [
  {
    "name": "weight",
    "label": "Размер пиццы",
    "select": [
      "one",
      "req"
    ],
    "option": [
      [
        "27 см",
        0
      ],
      [
        "37 см",
        100
      ]
    ],
    "current": [
      0
    ]
  },
];
// const optionsCategory = [
//   {
//     "name": "weight",
//     "label": "Веc пиццы",
//     "select": [
//       "one",
//       "req"
//     ],
//     "option": [
//       [
//         "550 г",
//         // "27 см",
//         0
//       ],
//       [
//         "700 г",
//         // "37 см",
//         100
//       ]
//     ],
//     "current": [
//       0
//     ]
//   },
//   {
//     "name": "supplements",
//     "label": "Добавки",
//     "select": [
//       "multi",
//       "noreq"
//     ],
//     "option": [
//       [
//         "сырный бортик",
//         150
//       ],
//       [
//         "моцарелла",
//         70
//       ],
//       [
//         "шампиньоны",
//         60
//       ]
//     ],
//     "current": []
//   },
//   {
//     "name": "sauceFree",
//     "label": "Бесплатный Соус",
//     "select": [
//       "one",
//       "noreq"
//     ],
//     "option": [
//       [
//         "кисло-сладкий",
//         0
//       ],
//       [
//         "сырный",
//         0
//       ],
//       [
//         "карри",
//         0
//       ]
//     ],
//     "current": [
//       0
//     ]
//   },
//   {
//     "name": "sauce",
//     "label": "Дополнительный соус",
//     "select": [
//       "multi",
//       "noreq"
//     ],
//     "option": [
//       [
//         "кисло-сладкий",
//         20
//       ],
//       [
//         "сырный",
//         20
//       ],
//       [
//         "карри",
//         20
//       ]
//     ],
//     "current": []
//   }
// ]


export const setGoods = (items) => {
  items['pizza']['optionsCategory'] = optionsCategory;
  return {
    type: 'SET_GOODS',
    payload: items
  }
}
  ;

export const clearGoods = () => (
  {
    type: 'CLEAR_GOODS',

  }
);