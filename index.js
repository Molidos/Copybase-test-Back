import express from "express"
import cors from "cors"

const app = express();
const port = 8800;

//middlewares
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Servidor funcionando!')
})

app.post('/processar-dados', (req, res) => {
    try {
      const { mrrData, customerHistory } = req.body;
  
      // Calcular o MRR
      const totalMRR = mrrData.reduce((sum, entry) => sum + entry.revenue, 0);
  
      // Calcular o Churn Rate
      const activeCustomers = customerHistory.filter((entry) => entry.endMonth === 'march').length;
      const totalCustomers = customerHistory.length;
      const churnRate = (totalCustomers - activeCustomers) / totalCustomers;
  
      res.json({ mrr: totalMRR, churnRate });
    } catch (error) {
      console.error('Erro durante o processamento:', error.message);
      res.status(500).json({ error: 'Erro durante o processamento dos dados.' });
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });