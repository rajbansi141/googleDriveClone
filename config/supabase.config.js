// const Supabase = require('@supabase/supabase-js')
const serviceAccount = require('./supabase.json')

// const supabase = Supabase.initializeApp({
//     credentials: Supabase.credentials.cert(serviceAccount),
//     // databaseURL: 'https://yeiflpetamakrmsohrws.supabase.co',
//     storageBucket: 'googleDriveClone'
// })

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Needed for server-side overrides
);

module.exports = supabase
  


