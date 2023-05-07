import Navigation from '../../components/Navigation/Navigation.component';
import Cryptic from '../../components/CrypticTab/Cryptic.component';


const Home = () => {
  // const { userLogged, movieData } = useContext(UserContext);

  // const [passList, setPassList] = useState("");

  // useEffect(()=> {
  //   fetch('http://localhost:3001/pass-list', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       token: 'Bearer' + sessionStorage.getItem('token'),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setPassList(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [])

  return (
    <div>
      <Navigation />
      <Cryptic />
    </div>
  );
};

export default Home;
