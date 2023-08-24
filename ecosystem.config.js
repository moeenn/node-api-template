module.exports = {
  apps: [
    {
      name: "dms_backend",
      instances: 0,
      exec_mode: "cluster",
      script: "./build/index.js"
    },
    // {
    //   name: "cron",
    //   script: "./build/app/jobs/processMissedDeliveries.js",
    //   instances: 1,
    //   exec_mode: "fork",
    //   cron_restart: "0 * * * *", // "0 * * * *" means run at minute zero i.e. every hour    
    //   watch: false,
    //   autorestart: false
    // }
  ]
}