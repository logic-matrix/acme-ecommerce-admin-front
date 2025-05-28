interface Team {
  id: number;
  name: string;
  position: string;
  image: string;
}
const Teams: Team[] = [
  {
    id: 1,
    name: "Ralph Edwards",
    position: "Founder & CEO",
    image: "/team/one.jpg",
  },
  {
    id: 2,
    name: "Cody Fisher",
    position: "Marketing Coordinator",
    image: "/team/two.jpg",
  },
  {
    id: 3,
    name: "Bessie Cooper",
    position: "Marketing Coordinator",
    image: "/team/three.jpg",
  },
  {
    id: 4,
    name: "Annette Black",
    position: "Web Designer",
    image: "/team/four.jpg",
  },
  {
    id: 5,
    name: "Devon Lane",
    position: "Marketing Coordinator",
    image: "/team/five.jpg",
  },
];
export default Teams;
