import {useState, useRef, useEffect} from "react";
import axios from "axios";

interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

interface User {
  name: string;
  email: string;
}

// interface ProfileResponse {
//   success: boolean;
//   message: string;
//   user?: User;
// }

const Auth = () => {
  const apiurl = useRef<string>("http://localhost:8080/");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [err, setErr] = useState(false);

  async function handleLogin() {
    try {
      const {data} = await axios.post<LoginResponse>(`${apiurl}/api/user/login`, {
        username,
        password
      });
      if (data.success) {
        setLoggedIn(true);
        // await handleProfile();
        setProfile(data.user || null);
        localStorage.setItem("user", JSON.stringify(data.user));
        const startTime = new Date().getTime();
        localStorage.setItem("time", JSON.stringify(startTime));
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred. Please try again.");
    }
  }

  function handleLogout() {
    axios.post("/api/logout").then(() => {
      setLoggedIn(false);
      setProfile(null);
    });
  }

  return (
    <>
      {loggedIn ? (
        <>
          <p>Welcome, {profile?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form
          className="flex flex-col w-full m-auto p-5 bg-gradient-to-b from-blue-900 to-purple-900 text-slate-300 
        shadow-lg shadow-slate-500/50 rounded-lg"
          onSubmit={handleLogout}>
          <h3 className="m-2 text-xl font-bold text-slate-300">Log In</h3>

          <label className="mt-4 px-2">Email address:</label>
          <input
            className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            //   onChange={(e) => setEmail(e.target.value)}
            value={username}
          />
          <label className="mt-4 px-2">Password:</label>
          <input
            className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            className="m-auto mt-2 p-2 hover:bg-slate-400 hover:text-blue-900 
          active:scale-90 duration-500 rounded-xl"
            //   disabled={loadState}
          >
            Log in
          </button>
          {err && (
            <div
              className="error mx-auto mt-1 p-1 px-2 text-red-400 border 
          border-red-400 rounded-xl">
              {err}
            </div>
          )}
        </form>
      )}
    </>
  );
};

interface Users {
  id: string;
  name: string;
}

const FetchUsers = () => {
  const apiurl = useRef<string>("http://localhost:8080");
  const [users, setUsers] = useState<Users[]>();

  //   useEffect(() => {
  //     console.log(users);
  //     console.log(typeof apiurl.current);

  //     return () => {};
  //   }, [users]);

  useEffect(() => {
    axios.get<Users[]>(`${apiurl.current}/users`).then((response) => {
      //   console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setUsers(response.data);
      }
    });

    return () => {};
  }, []);

  return (
    <div className="p-4">
      {users?.map(({id, name}) => (
        <div key={id}>{`User ${id}: ${name}`}</div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row px-2 h-28 border rounded-lg">
        <h1 className="font-bold text-5xl p-2 my-auto">TODO App</h1>
      </div>
      <div className="flex flex-row my-20 w-full">
        <div className="w-1/2 mx-auto shadow-lg border rounded-lg">
          <FetchUsers />
        </div>
        <div className="w-1/2 px-20">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default App;

