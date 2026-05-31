// --- 1. ĐỊNH NGHĨA DỮ LIỆU (INTERFACES) ---

export interface TarotCard {
  id: string | number;
  name: string;
  englishName: string;
  suit: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
}

export interface Position {
  id: number;
  name: string;
  description: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: Position;
}

export interface Spread {
  id: string;
  name: string;
  englishName: string;
  description: string;
  cardCount: number;
  positions: Position[];
}

// --- 2. BẢN ĐỒ HÌNH ẢNH (IMAGE MAP) ---

export const cardImageMap: Record<string, string> = {
  // Bộ Ẩn Chính (Major Arcana)
  "0": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266633/00-TheFool_isi1ku.png",
  "1": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266634/01-TheMagician_oc4xhr.png",
  "2": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266634/02-TheHighPriestess_rxstb3.png",
  "3": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266634/03-TheEmpress_dztgw3.png",
  "4": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/04-TheEmperor_cycstp.png",
  "5": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266634/05-TheHierophant_l20bbb.png",
  "6": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/06-TheLovers_sdruiz.png",
  "7": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/07-TheChariot_cuhkvy.png",
  "8": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/08-Strength_zyrt8m.png",
  "9": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/09-TheHermit_phdbyh.png",
  "10": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/10-WheelOfFortune_oe4ae8.png",
  "11": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/11-Justice_bsduln.png",
  "12": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266635/12-TheHangedMan_q96bfd.png",
  "13": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/13-Death_c2kmc7.png",
  "14": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/14-Temperance_heja9h.png",
  "15": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/15-TheDevil_dghihw.png",
  "16": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/16-TheTower_zjmvum.png",
  "17": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266636/17-TheStar_ajuol8.png",
  "18": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/18-TheMoon_to7ou7.png",
  "19": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/19-TheSun_ttuykk.png",
  "20": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/20-Judgement_ftycrb.png",
  "21": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/21-TheWorld_pcjren.png",

  // Bộ Ly (Cups)
  "ace_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/Cups01_oqfvna.png",
  "two_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266637/Cups02_bapsl8.png",
  "three_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266638/Cups03_bwpfmh.png",
  "four_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266638/Cups04_babaqp.png",
  "five_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266638/Cups05_ess4cb.png",
  "six_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266638/Cups06_hatbno.png",
  "seven_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266639/Cups07_ecbpkr.png",
  "eight_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266639/Cups08_sih2so.png",
  "nine_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266639/Cups09_sn613e.png",
  "ten_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266639/Cups10_jhzfit.png",
  "page_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266640/Cups11_ci1wcc.png",
  "knight_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266640/Cups12_xm2orb.png",
  "queen_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266640/Cups13_jtbbel.png",
  "king_cups": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Cups14_s9oo76.png",

  // Bộ Tiền (Pentacles)
  "ace_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266640/Pentacles01_ukfnld.png",
  "two_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Pentacles02_jlwghm.png",
  "three_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Pentacles03_thn0ys.png",
  "four_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Pentacles04_ipr9kd.png",
  "five_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Pentacles05_p0nhau.png",
  "six_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266641/Pentacles06_uaokr3.png",
  "seven_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266642/Pentacles07_j9llxy.png",
  "eight_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266642/Pentacles08_etdx52.png",
  "nine_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266642/Pentacles09_sgqzrn.png",
  "ten_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266642/Pentacles10_a36n5b.png",
  "page_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266643/Pentacles11_biumky.png",
  "knight_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266643/Pentacles12_ezq1br.png",
  "queen_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266643/Pentacles13_tiqe19.png",
  "king_pentacles": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266643/Pentacles14_chm3ku.png",

  // Bộ Kiếm (Swords)
  "ace_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266643/Swords01_jmlc57.png",
  "two_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266644/Swords02_h9byan.png",
  "three_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266644/Swords03_gtw8j0.png",
  "four_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266644/Swords04_oensfk.png",
  "five_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266644/Swords05_q2gyib.png",
  "six_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266645/Swords06_kh2ks4.png",
  "seven_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266645/Swords07_dfy8pe.png",
  "eight_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266645/Swords08_xs5pfl.png",
  "nine_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266645/Swords09_jzxjzs.png",
  "ten_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266646/Swords10_zupp2j.png",
  "page_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266646/Swords11_jjtflz.png",
  "knight_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266646/Swords12_s6nevq.png",
  "queen_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266646/Swords13_vrlfsw.png",
  "king_swords": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266646/Swords14_wp8let.png",

  // Bộ Gậy (Wands)
  "ace_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266647/Wands01_xi0fzx.png",
  "two_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266647/Wands02_nyn0hi.png",
  "three_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266647/Wands03_sdem4j.png",
  "four_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266647/Wands04_odfapq.png",
  "five_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266648/Wands05_pvmlfn.png",
  "six_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266648/Wands06_ckabhs.png",
  "seven_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266648/Wands07_ppizx4.png",
  "eight_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266648/Wands08_uziyow.png",
  "nine_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266648/Wands09_abedgu.png",
  "ten_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266649/Wands10_guerhb.png",
  "page_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266649/Wands11_xpffvt.png",
  "knight_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266649/Wands12_q3vmty.png",
  "queen_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266649/Wands13_ibaovs.png",
  "king_wands": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png",

  // Mặt sau lá bài
  "back": "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767279841/card_back_v7qwmn.png"
};

// --- 3. HÀM TIỆN ÍCH LẤY ẢNH ---

/**
 * Lấy URL ảnh lá bài dựa trên ID.
 * Nếu không tìm thấy ID, sẽ trả về ảnh mặt sau lá bài.
 */
export function getCardImageUrl(cardId: string | number): string {
  const id = String(cardId);
  return cardImageMap[id] || cardImageMap["back"];
}