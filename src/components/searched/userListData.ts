export type RecordItem = {
  value: string;
  time: string;
  detail: string;
  manager: string;
  managerThumbnail: string;
};

export type RecordItemType =
  | "eating"
  | "drinking"
  | "excretion"
  | "vital"
  | "bathing"
  | "oral"
  | "weight"
  | "contact"
  | "";

export type UserRecord = {
  eating?: RecordItem;
  drinking?: RecordItem;
  excretion?: RecordItem;
  vital?: RecordItem;
  bathing?: RecordItem;
  oral?: RecordItem;
  weight?: RecordItem;
  contact?: RecordItem;
};

export const userList = [
  {
    department: "デイサービス",
    room: "",
    name: "山田太郎",
  },
  {
    department: "デイサービス",
    room: "",
    name: "岡田 辰夫",
  },
  {
    department: "従来",
    room: "",
    name: "古田 太郎",
  },
  {
    department: "ユニット",
    room: "1A",
    name: "山田 太郎",
    records: {
      eating: {
        value: "食事",
        time: "2023/12/11 14:10",
        detail: " とろみ 6割",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
      drinking: {
        value: "水分",
        time: "2023/12/11 14:30",
        detail: "お茶 100ml",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
      excretion: {
        value: "排泄",
        time: "2023/12/11 14:10",
        detail: "お茶 100ml",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
    },
  },
  {
    department: "ユニット",
    room: "1A",
    name: "鈴木 一郎",
    records: {
      eating: {
        value: "食事",
        time: "2023/12/11 14:20",
        detail: "全粥 8割",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
      drinking: {
        value: "水分",
        time: "2023/12/11 13:10",
        detail: "お茶 100ml",
        manager: "山田 花子",
        managerThumbnail: "yamadahanako",
      },
    },
  },
  {
    department: "ユニット",
    room: "1A",
    name: "田中 花子",
    records: {
      excretion: {
        value: "排泄",
        time: "2023/12/11 14:50",
        detail: "小",
        manager: "山田 花子",
        managerThumbnail: "yamadahanako",
      },
    },
  },
  {
    department: "ユニット",
    room: "1A",
    name: "岡本 よし子",
    records: {
      drinking: {
        value: "水分",
        time: "2023/12/11 14:30",
        detail: "お茶 100ml",
        manager: "山田 花子",
        managerThumbnail: "yamadahanako",
      },
      excretion: {
        value: "排泄",
        time: "2023/12/11 14:10",
        detail: "お茶 100ml",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
    },
  },
  { department: "ユニット", room: "1A", name: "田中 花子" },

  {
    department: "ユニット",
    room: "1B",
    name: "田中 花子",
    records: {
      eating: {
        value: "食事",
        time: "2023/12/11 14:10",
        detail: " とろみ 6割",
        manager: "岩間 日菜",
        managerThumbnail: "iwamahina",
      },
    },
  },
  { department: "ユニット", room: "1B", name: "田中 花子" },
  { department: "ユニット", room: "1B", name: "田中 花子" },
  { department: "ユニット", room: "1B", name: "田中 花子" },
  { department: "ユニット", room: "1B", name: "田中 花子" },
  { department: "ユニット", room: "1B", name: "田中 花子" },
  { department: "ユニット", room: "1B", name: "田中 花子" },

  { department: "ユニット", room: "2A", name: "田中 花子" },
  { department: "ユニット", room: "2A", name: "田中 花子" },
  { department: "ユニット", room: "2A", name: "田中 花子" },
  { department: "ユニット", room: "2A", name: "田中 花子" },
  { department: "ユニット", room: "2A", name: "田中 花子" },

  { department: "ユニット", room: "2B", name: "田中 花子" },
  { department: "ユニット", room: "2B", name: "田中 花子" },
  { department: "ユニット", room: "2B", name: "田中 花子" },
  { department: "ユニット", room: "2B", name: "田中 花子" },
  { department: "ユニット", room: "2B", name: "田中 花子" },
];
