import {useState, useRef, useEffect} from "react";
import axios from "axios";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user?: User;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Signup = () => {
  const [email, setEmail] = useState(``);
  const [username, setUsername] = useState(``);
  const apiurl = useRef<string>(`http://localhost:8082`);
  const [err, setErr] = useState();

  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      const {data} = await axios.post<LoginResponse>(
        `${apiurl.current}/api/user/signup`,
        {
          name: username,
          email
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(data);
      if (data.user?.id) {
        alert(`Sign up successful`);
      }
    } catch (error) {
      console.log(error);
      // setErr(error)
    }
  }

  return (
    <>
      <form
        className="flex flex-col w-full m-auto p-5 bg-gradient-to-b from-slate-900 to-purple-900 text-slate-300 
  shadow-lg shadow-slate-500/50 rounded-lg"
        onSubmit={handleSignup}>
        <h3 className="m-2 text-xl font-bold text-slate-300">Sign Up</h3>

        <label className="mt-4 px-2">Name:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          //   onChange={(e) => setEmail(e.target.value)}
          value={username}
        />

        <label className="mt-4 px-2">Email address:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          //   onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button
          className="m-auto mt-2 p-2 hover:bg-slate-400 hover:text-blue-900 
    active:scale-90 duration-500 rounded-xl"
          //   disabled={loadState}
        >
          Sign Up
        </button>
        {err && (
          <div
            className="error mx-auto mt-1 p-1 px-2 text-red-400 border 
    border-red-400 rounded-xl">
            {err}
          </div>
        )}
      </form>
    </>
  );
};

const Auth = (props: any) => {
  const apiurl = useRef<string>(`http://localhost:8082`);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [err, setErr] = useState();

  async function handleLogin(e: any) {
    e.preventDefault();
    console.log(email, password);

    try {
      const {data} = await axios.post<LoginResponse>(
        `${apiurl.current}/api/user/login`,
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(data);
      if (data.user) {
        setLoggedIn(true);
        // await handleProfile();
        setProfile(data.user || null);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        const startTime = new Date().getTime();
        localStorage.setItem("time", JSON.stringify(startTime));
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
      // setErr(e)
      // alert("An error occurred. Please try again.");
    }
  }

  function handleLogout(e: any) {
    e.preventDefault();

    // axios.post("/api/logout").then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("time");
    setLoggedIn(false);
    setProfile(null);
    // });
  }

  return (
    <>
      {loggedIn ? (
        <>
          <p>Welcome, {profile?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : !props.signuptoggle ? (
        <form
          className="flex flex-col w-full m-auto p-5 bg-gradient-to-b from-blue-900 to-purple-900 text-slate-300 
        shadow-lg shadow-slate-500/50 rounded-lg"
          onSubmit={handleLogin}>
          <h3 className="m-2 text-xl font-bold text-slate-300">Log In</h3>

          <label className="mt-4 px-2">Email address:</label>
          <input
            className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            //   onChange={(e) => setEmail(e.target.value)}
            value={email}
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
      ) : (
        <Signup />
      )}
    </>
  );
};

const FetchTestUsers = () => {
  const apiurl = useRef<string>("http://localhost:8080");
  const [users, setUsers] = useState<User[]>();

  //   useEffect(() => {
  //     console.log(users);
  //     console.log(typeof apiurl.current);

  //     return () => {};
  //   }, [users]);

  useEffect(() => {
    axios.get<User[]>(`${apiurl.current}/users`).then((response) => {
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

const DataBaseUsers = () => {
  const apiurl = useRef<string>("http://localhost:8080");
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    axios.get<User[]>(`${apiurl.current}/api/users`).then((response) => {
      //   console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setUsers(response.data);
      }
    });

    return () => {};
  }, []);

  const delUser = (user: User) => {
    // e.preventDefault();
    axios.delete(`${apiurl.current}/api/user/${user.id}`);
  };

  return (
    <div className="w-3/12 h-80 ml-4 p-1 mx-auto shadow-lg shadow-slate-500/50 border rounded-lg">
      <h1 className="p-2 text-2xl">All users</h1>
      {users &&
        users.map((user) => {
          return (
            <div key={user.id} className="flex flex-row h-12 justify-between">
              <h2>{user.name}</h2>
              <button className="h-fit" onClick={() => delUser(user)}>
                del
              </button>
            </div>
          );
        })}
    </div>
  );
};

const App = () => {
  const [signuptoggle, setSignuptoggle] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row m-1 px-2 h-28 border rounded-lg">
        <h1 className="font-bold text-5xl p-2 my-auto">TODO App</h1>
      </div>
      <div className="flex flex-row my-20 w-full">
        <div className="w-2/12 h-80 ml-4 mx-auto shadow-lg shadow-slate-500/50 border rounded-lg">
          <h1 className="p-2 text-2xl">Test App</h1>
          <FetchTestUsers />
        </div>
        <DataBaseUsers />
        <div className="flex flex-row justify-end w-2/12 mx-auto p-2">
          <label className="flex flex-col justify-center">
            <input
              className="text-3xl"
              type="checkbox"
              id="toggle-example"
              onChange={() => setSignuptoggle(!signuptoggle)}
            />
            <span className="text-center">Toggle for sign up</span>
          </label>
        </div>
        <div className={`w-5/12 px-20 border rounded-lg`}>
          <Auth signuptoggle={signuptoggle} />
        </div>
      </div>
    </div>
  );
};

export default App;

