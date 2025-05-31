// TODO: Need to make an interface for useSaveReceipt
/*
{
    "receipt_id": 24,
    "title": "hello title 2",
    "image_url": "http://minio:9000/local-bucket/uploads/images/683b04fa7f0c3.png",
    "user_who_paid": "perry",
    "total_amount": 10000,
    "person_1_amount": 1000,
    "person_2_amount": 2993,
    "person_1_bought_items": [
        {
            "bought_item_id": 330,
            "receipt_id": 24,
            "name": "ハーゲンミニCロウチャクリキーウカ",
            "price": 218,
            "payer_name": "perry"
        },
        {
            "bought_item_id": 331,
            "receipt_id": 24,
            "name": "オリジナルスフラッドオレンジ",
            "price": 204,
            "payer_name": "perry"
        },
        {
            "bought_item_id": 332,
            "receipt_id": 24,
            "name": "オカメ スコイサットS-903",
            "price": 264,
            "payer_name": "perry"
        },
        {
            "bought_item_id": 343,
            "receipt_id": 24,
            "name": "コイワイヨーグルトホンボウ400g",
            "price": 199,
            "payer_name": "perry"
        },
        {
            "bought_item_id": 344,
            "receipt_id": 24,
            "name": "ミヤマ イチオシムキチ 200g",
            "price": 153,
            "payer_name": "perry"
        },
        {
            "bought_item_id": 345,
            "receipt_id": 24,
            "name": "コウサンウオカトリムネニク",
            "price": 596,
            "payer_name": "perry"
        }
    ],
    "person_2_bought_items": [
        {
            "bought_item_id": 340,
            "receipt_id": 24,
            "name": "トマト コツコ",
            "price": 398,
            "payer_name": "hannah"
        },
        {
            "bought_item_id": 341,
            "receipt_id": 24,
            "name": "タンノンビオカセイタクブドウ",
            "price": 326,
            "payer_name": "hannah"
        },
        {
            "bought_item_id": 342,
            "receipt_id": 24,
            "name": "タンノンビオ シチリアレモン 4コ",
            "price": 163,
            "payer_name": "hannah"
        }
    ],
    "both_bought_items": [
        {
            "bought_item_id": 333,
            "receipt_id": 24,
            "name": "アタックウオシEXヘヤカカ850g",
            "price": 308,
            "payer_name": "both"
        },
        {
            "bought_item_id": 334,
            "receipt_id": 24,
            "name": "コウサンウオトンジヤ玉150×3",
            "price": 78,
            "payer_name": "both"
        },
        {
            "bought_item_id": 335,
            "receipt_id": 24,
            "name": "セブンスターリサンゴールド",
            "price": 499,
            "payer_name": "both"
        },
        {
            "bought_item_id": 336,
            "receipt_id": 24,
            "name": "ワイドハイターEXパワー820ml",
            "price": 328,
            "payer_name": "both"
        },
        {
            "bought_item_id": 337,
            "receipt_id": 24,
            "name": "サラヤ テイユコット100ムコち56",
            "price": 280,
            "payer_name": "both"
        },
        {
            "bought_item_id": 338,
            "receipt_id": 24,
            "name": "バナナ",
            "price": 256,
            "payer_name": "both"
        },
        {
            "bought_item_id": 339,
            "receipt_id": 24,
            "name": "ハウスバイング35g",
            "price": 100,
            "payer_name": "both"
        }
    ]
}

*/

export type BoughtItem = {
  bought_item_id: number
  receipt_id: number
  name: string
  price: number
  payer_name: string
}

// TODO: Shouldn't this be the AnalyzeReceiptResponse instead??
export type ReceiptInfoResponse = {
  message: string
  receipt_info: ReceiptInfo
  error_info?: string
}

export type ReceiptInfo = {
  items: ItemInfo[]
  receipt_total: number
}
export type ItemInfo = {
  name: string
  price_total: number
  who_paid?: string
}

// TODO: Need a better name
export type MoveToStepTwoPayload = {
  receiptInfo: {
    items: Array<ItemInfo>
    receipt_total: number
  } | null
  receiptTitle: string
  selectedFile: File | null
}
// TODO: Need a better name
export type MoveToStepThreePayload = {
  receiptId: number
  receiptTitle: string
}
