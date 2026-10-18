export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
  badge?: string;
}
export const certifications: Certification[] = [
  {
    name: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B81B93DBC6B169CD72099F1D26C095A154D331FADEA4B095975DC9748E702BF3",
  },
  {
    name: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E4509471FE004A356024779203993D72E92BF89053B834F42727AD281BADA55B",
  },
];
