# Deployment Guide for Vercel

## Prerequisites

1. Git repository with all changes committed
2. Vercel account with proper configuration
3. Environment variables set up in Vercel dashboard

## Current Build Status

✅ **Frontend**: Successfully builds to `frontend/dist/`
✅ **Admin**: Successfully builds to `admin/dist/`

## Deployment Steps

### Option 1: Deploy with Root Build Script

In the root directory, run:

```bash
npm run build
```

This will build both frontend and admin applications.

### Option 2: Deploy Individual Applications

#### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

#### Admin
```bash
cd admin
npm run build
# Output: admin/dist/
```

## Vercel Configuration

### For Root Workspace Deployment

Create `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "frontend/dist" }
    },
    {
      "src": "admin/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "admin/dist" }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/admin(.*)",
      "dest": "admin/dist/index.html"
    },
    {
      "src": "/api(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/index.html"
    }
  ]
}
```

### Build Commands

**Frontend:**
```
cd frontend && npm install && npm run build
```

**Admin:**
```
cd admin && npm install && npm run build
```

**Backend:**
```
cd backend && npm install
```

## Environment Variables Required

Add these to Vercel project settings:

- `VITE_API_URL` - Backend API URL
- `VITE_BACKEND_URL` - Backend server URL
- Any other environment variables needed

## Testing After Deployment

1. **Frontend**: Visit your Vercel deployment URL
2. **Admin**: Visit `your-domain.vercel.app/admin`
3. **API**: Test backend endpoints

## Troubleshooting

### If build fails with "terser not found":
- Ensure `terser` is in devDependencies
- Run `npm install` in the failing project

### If routes are not working:
- Verify `vercel.json` is correctly configured
- Check that dist folders are properly generated

### If API calls fail:
- Verify environment variables are set
- Check CORS configuration on backend
- Ensure `VITE_API_URL` is correctly pointing to backend

## Rollback Procedure

If deployment goes wrong:
1. Go to Vercel dashboard
2. Navigate to Deployments
3. Click the previous successful deployment
4. Click "Promote to Production"

## Next Steps

1. Push all changes to GitHub/GitLab
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Trigger first deployment
5. Monitor build logs in Vercel console
6. Test all functionality after deployment
