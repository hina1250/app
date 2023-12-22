// モックデータ（スタブデータ）
import yamadahanakoImage from "../../assets/images/manager/yamadahanako.jpg";
import iwamahinaImage from "../../assets/images/manager/iwamahina.jpg";
import tanakayumiImage from "../../assets/images/manager/tanakayumi.jpg";

type Images = {
  [key: string]: string;
}

export const images: Images = {
  yamadahanako: yamadahanakoImage,
  iwamahina: iwamahinaImage,
  tanakayumi: tanakayumiImage,
};
