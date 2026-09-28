// Areas served by the practice, used for schema areaServed and the
// /patients-from-outside-chennai page. Single source of truth.

export const primaryCity = 'Chennai';

export const tamilNaduCities = [
 'Chengalpattu', 'Kanchipuram', 'Tiruvallur', 'Vellore', 'Villupuram',
 'Cuddalore', 'Puducherry', 'Tiruchirappalli', 'Thanjavur', 'Madurai',
 'Coimbatore', 'Salem', 'Erode', 'Tirunelveli', 'Thoothukudi', 'Hosur',
 'Krishnagiri', 'Dharmapuri',
];

export const neighbouringCities = [
 'Tirupati', 'Nellore', 'Chittoor', 'Vijayawada', 'Visakhapatnam',
 'Hyderabad', 'Bengaluru', 'Mysuru', 'Thiruvananthapuram', 'Kochi',
];

export const states = [
 'Tamil Nadu', 'Puducherry', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala',
];

export const countries = [
 'India', 'Sri Lanka', 'Maldives', 'Bangladesh', 'Oman', 'UAE',
 'Saudi Arabia', 'Kenya', 'Tanzania', 'Nigeria', 'Iraq',
];

export function areaServedSchema() {
 return [
  { '@type': 'City', name: primaryCity },
  ...tamilNaduCities.map((name) => ({ '@type': 'City', name })),
  ...neighbouringCities.map((name) => ({ '@type': 'City', name })),
  ...states.map((name) => ({ '@type': 'State', name })),
  ...countries.map((name) => ({ '@type': 'Country', name })),
 ];
}
