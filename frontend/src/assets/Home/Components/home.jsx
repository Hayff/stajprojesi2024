import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/context";
import { useNavigate } from "react-router-dom"; 
import http from "../../../libs/http";

export default function Home() {
  const [guess, setGuess] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState(""); 
  const [users, setUsers] = useState([]); 
  const authState = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await http.get("/api/list");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setUsers([]);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await http.post("/api/submit", {
      firstName: authState.data.user.username,
      guess: guess,
    });

    const data = await response;

    if (data.data.status === 200) {
      setGuess(data?.data);
      setStatusMessage("Girdiğiniz sayı bir asal sayıdır. Başarıyla kaydedildi!");
      setStatusColor("green");
      fetchUsers();
    } else if (data.data.status === 400) {
      setStatusMessage("Girdiğiniz sayı asal değil. Lütfen tekrar deneyin.");
      setStatusColor("red");
    } else {
      setStatusMessage("Bir hata oluştu.");
      setStatusColor("red");
    }
  };

  const deleteAllUsers = async () => {
    try {
      const response = await http.delete("/api/deleteAll");
      if (response.status === 200) {
        setUsers([]);
        setStatusMessage("Tüm kullanıcılar başarıyla silindi.");
        setStatusColor("green");
      } else {
        setStatusMessage("Kullanıcılar silinirken hata oluştu!");
        setStatusColor("red");
      }
    } catch (error) {
      setStatusMessage("Hata: " + error.message);
      setStatusColor("red");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10">
        <form className="card shadow p-4 mb-4" onSubmit={onSubmit}>
          <div className="text-center card-header mb-4">
            <h3 className="mb-3" style={{ color: "#4a90e2", fontWeight: "bold" }}>Asal Sayı Tahmini</h3>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Tahmin Edilen Sayı:</label>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Bir sayı giriniz"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: "10px 20px", fontSize: "16px" }}>
              Gönder
            </button>
          </div>
        </form>

        {statusMessage && (
          <div
            className={`alert text-center ${statusColor === "green" ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {statusMessage}
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={deleteAllUsers} className="btn btn-warning" style={{ marginRight: "10px" }}>
            Tüm Kullanıcıları Sil
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Çıkış Yap
          </button>
        </div>

        {users.length > 0 ? (
          <div className="mt-4">
            <h5 className="text-center">Kullanıcılar Listesi</h5>
            <ul className="list-group">
              {users.map((user, index) => (
                <li key={index} className="list-group-item">
                  {user.firstName} - {user.guess}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center mt-4">Henüz kullanıcı yok.</p>
        )}
      </div>
    </div>
  );
}
