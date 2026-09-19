export const dynamic = 'force-static';

export default function Home() {
  return (
    <html>
      <head>
        <title>Ulotty - Live</title>
        <style>{`
          body { 
            font-family: system-ui; 
            margin: 0; 
            padding: 40px;
            background: #fff;
            color: #333;
          }
          h1 { margin: 0; }
          p { margin: 10px 0; }
          a { color: #463f35; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .links { margin-top: 40px; display: flex; gap: 20px; }
          .links a { 
            padding: 10px 20px; 
            background: #463f35; 
            color: white; 
            border-radius: 6px;
          }
        `}</style>
      </head>
      <body>
        <h1>🚀 Ulotty</h1>
        <p>Deployed on Vercel ✅</p>
        <div className="links">
          <a href="/propiedades">Propiedades</a>
        </div>
      </body>
    </html>
  );
}
