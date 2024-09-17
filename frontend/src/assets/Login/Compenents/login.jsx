import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../libs/http";
import { AuthContext } from "../../Context/context";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await http.post("/api/login", {
      username: username,
      password: password,
    });
    const data = await response;

    if (data.data.status === 200) {
      authContext.onLoginSuccess(response.data);
      navigate("/home");
      setStatusMessage("Giriş başarılı!");
    } else {
      setStatusMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-lg-6 col-md-8 col-sm-10">
        <form className="card shadow p-4" onSubmit={handleLogin}>
          <div className="text-center card-header mb-4">
            <h3 className="mb-3" style={{ color: "#4a90e2", fontWeight: "bold" }}>Giriş Yap</h3>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Kullanıcı Adı</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adı giriniz"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Şifre</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre giriniz"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: "10px 20px", fontSize: "16px" }}>
              Giriş Yap
            </button>
          </div>

          <div className="text-center mt-3">
            <span>
              Yeni misiniz? <Link to="/signUp" style={{ color: "#4a90e2" }}>Kayıt Ol</Link>
            </span>
          </div>
        </form>

        {statusMessage && (
          <div className="text-center mt-3">
            <p className={`alert ${statusMessage.includes("başarılı") ? "alert-success" : "alert-danger"}`} role="alert">
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
