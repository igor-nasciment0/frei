import { useEffect } from 'react';
import './index.scss';
import { get } from 'local-storage';
import { useNavigate } from 'react-router';

export default function Cabecalho() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = get("token");

    // if (!token)
    //   navigate("/login");
  }, [])

  return (
    <>
      <header className="cabecalho">
        <div className="usuario">
          <div>
            <h3>Bruno O</h3>
            <h4>Online</h4>
          </div>
          <img src="/assets/images/a.jpg" alt="" />
        </div>
      </header>
    </>
  )
}