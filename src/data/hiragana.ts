export type Hiragana = {
  kana: string;
  romaji: string;
  groupId: string;
};

export const hiraganaData: Hiragana[] = [
  // Vowels
  { kana: 'あ', romaji: 'a', groupId: 'vowels' },
  { kana: 'い', romaji: 'i', groupId: 'vowels' },
  { kana: 'う', romaji: 'u', groupId: 'vowels' },
  { kana: 'え', romaji: 'e', groupId: 'vowels' },
  { kana: 'お', romaji: 'o', groupId: 'vowels' },

  // K Row
  { kana: 'か', romaji: 'ka', groupId: 'k' },
  { kana: 'き', romaji: 'ki', groupId: 'k' },
  { kana: 'く', romaji: 'ku', groupId: 'k' },
  { kana: 'け', romaji: 'ke', groupId: 'k' },
  { kana: 'こ', romaji: 'ko', groupId: 'k' },

  // S Row
  { kana: 'さ', romaji: 'sa', groupId: 's' },
  { kana: 'し', romaji: 'shi', groupId: 's' },
  { kana: 'す', romaji: 'su', groupId: 's' },
  { kana: 'せ', romaji: 'se', groupId: 's' },
  { kana: 'そ', romaji: 'so', groupId: 's' },

  // T Row
  { kana: 'た', romaji: 'ta', groupId: 't' },
  { kana: 'ち', romaji: 'chi', groupId: 't' },
  { kana: 'つ', romaji: 'tsu', groupId: 't' },
  { kana: 'て', romaji: 'te', groupId: 't' },
  { kana: 'と', romaji: 'to', groupId: 't' },

  // N Row
  { kana: 'な', romaji: 'na', groupId: 'n' },
  { kana: 'に', romaji: 'ni', groupId: 'n' },
  { kana: 'ぬ', romaji: 'nu', groupId: 'n' },
  { kana: 'ね', romaji: 'ne', groupId: 'n' },
  { kana: 'の', romaji: 'no', groupId: 'n' },

  // H Row
  { kana: 'は', romaji: 'ha', groupId: 'h' },
  { kana: 'ひ', romaji: 'hi', groupId: 'h' },
  { kana: 'ふ', romaji: 'fu', groupId: 'h' },
  { kana: 'へ', romaji: 'he', groupId: 'h' },
  { kana: 'ほ', romaji: 'ho', groupId: 'h' },

  // M Row
  { kana: 'ま', romaji: 'ma', groupId: 'm' },
  { kana: 'み', romaji: 'mi', groupId: 'm' },
  { kana: 'む', romaji: 'mu', groupId: 'm' },
  { kana: 'め', romaji: 'me', groupId: 'm' },
  { kana: 'も', romaji: 'mo', groupId: 'm' },

  // Y Row
  { kana: 'や', romaji: 'ya', groupId: 'y' },
  { kana: 'ゆ', romaji: 'yu', groupId: 'y' },
  { kana: 'よ', romaji: 'yo', groupId: 'y' },

  // R Row
  { kana: 'ら', romaji: 'ra', groupId: 'r' },
  { kana: 'り', romaji: 'ri', groupId: 'r' },
  { kana: 'る', romaji: 'ru', groupId: 'r' },
  { kana: 'れ', romaji: 're', groupId: 'r' },
  { kana: 'ろ', romaji: 'ro', groupId: 'r' },

  // W Row & N
  { kana: 'わ', romaji: 'wa', groupId: 'w' },
  { kana: 'を', romaji: 'wo', groupId: 'w' },
  { kana: 'ん', romaji: 'n', groupId: 'w' },
];

export const hiraganaGroups = [
  { id: 'vowels', label: 'Vowels (A, I, U, E, O)' },
  { id: 'k', label: 'K Row (Ka, Ki, ...)' },
  { id: 's', label: 'S Row (Sa, Shi, ...)' },
  { id: 't', label: 'T Row (Ta, Chi, ...)' },
  { id: 'n', label: 'N Row (Na, Ni, ...)' },
  { id: 'h', label: 'H Row (Ha, Hi, ...)' },
  { id: 'm', label: 'M Row (Ma, Mi, ...)' },
  { id: 'y', label: 'Y Row (Ya, Yu, Yo)' },
  { id: 'r', label: 'R Row (Ra, Ri, ...)' },
  { id: 'w', label: 'W & N (Wa, Wo, N)' },
];
