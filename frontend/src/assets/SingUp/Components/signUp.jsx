import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../../libs/http";
import { AuthContext } from "../../Context/context";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== passwordRepeat) {
      setStatusMessage("Şifreler uyuşmuyor!");
      return;
    }

    try {
      const response = await http.post("/api/signUp", {
        username: username,
        password: password,
        passwordRepeat: passwordRepeat,
      });

      const data = await response;
      if (data.data.status === 200) {
        navigate("/login");
        setStatusMessage("Kayıt olma başarılı!");
      } else if (data.data.status === 501) {
        setStatusMessage("Bu kullanıcı adı kullanılmakta");
      } else {
        setStatusMessage("Bir hata oluştu");
      }
    } catch (error) {
      setStatusMessage("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-lg-6 col-md-8 col-sm-10">
        <form className="card shadow p-4" onSubmit={handleSignUp}>
          <div className="text-center card-header mb-3">
            <h1 className="mb-3" style={{ color: "#4a90e2", fontWeight: "bold" }}>Kayıt Ol</h1>
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

          <div className="form-group mb-4">
            <label className="form-label">Şifre (Tekrar)</label>
            <input
              type="password"
              className="form-control"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              placeholder="Şifrenizi tekrar giriniz"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: "10px 20px", fontSize: "16px" }}>
              Kayıt Ol
            </button>
          </div>
          <div className="text-center mt-3">
          <p>Hesabın var mı? <Link to="/login">Giriş Yap</Link></p>
        </div>
        </form>

        {statusMessage && (
          <div className="text-center mt-3">
            <p className={`alert ${statusMessage.includes("başarılı") ? "alert-success" : "alert-danger"}`} role="alert">
              {statusMessage}
            </p>
          </div>
        )}

        {/* Hesabın var mı? bağlantısı */}

      </div>
    </div>
  );
}
