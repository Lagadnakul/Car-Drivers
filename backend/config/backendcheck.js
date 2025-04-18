const PORT = process.env.PORT || 4000;


export const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Go Pilot API</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
        line-height: 1.6;
        color: #333;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .container {
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 3rem;
        width: 90%;
        max-width: 600px;
        text-align: center;
      }
      .logo {
        margin-bottom: 1.5rem;
        color: #4f46e5;
        font-size: 3rem;
      }
      h1 {
        color: #111;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      p {
        color: #555;
        margin-bottom: 1.5rem;
      }
      .status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
      }
      .status-dot {
        height: 12px;
        width: 12px;
        background-color: #10b981;
        border-radius: 50%;
        display: inline-block;
        animation: pulse 1.5s infinite;
        margin-bottom: 23px;
      }
      .endpoints {
        background-color: #f8fafc;
        border-radius: 8px;
        padding: 1rem;
        text-align: left;
        margin-bottom: 1.5rem;
      }
      .endpoint {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e2e8f0;
      }
      .endpoint:last-child {
        border-bottom: none;
      }
      .method {
        font-weight: 500;
        color: #4f46e5;
      }
      .url {
        color: #64748b;
      }
      .footer {
        font-size: 0.875rem;
        color: #6b7280;
      }
      @keyframes pulse {
        0% { transform: scale(0.95); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(0.95); opacity: 1; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">🚗</div>
      <h1>Go Pilot API</h1>
      
      <div class="status">
        <span class="status-dot"></span>
        <p><strong>Status:</strong> API is running on port ${PORT}</p>
      </div>
      
      <div class="endpoints">
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="url">/api/users</span>
        </div>
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="url">/api/drivers</span>
        </div>
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="url">/api/bookings</span>
        </div>
        <div class="endpoint">
          <span class="method">POST</span>
          <span class="url">/api/users/login</span>
        </div>
      </div>
      
      <p>Use the above endpoints to interact with the Go Pilot API</p>
      
      <div class="footer">
        © ${new Date().getFullYear()} Go Pilot. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;