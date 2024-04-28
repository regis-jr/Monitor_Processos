using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;


namespace ProcessMonitorBackend.Controllers
{
    public class ProcessData
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double CpuUsage { get; set; }
        public long MemoryUsage { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProcesses()
        {
            try
            {
                var processes = Process.GetProcesses().Select(p => new ProcessData
                    {
                        Id = p.Id,
                        Name = p.ProcessName,
                        CpuUsage = GetCpuUsage(p),
                        MemoryUsage = p.PrivateMemorySize64
                    });

                return Ok(processes);
            }
            catch (UnauthorizedAccessException)
            {
                return StatusCode(403, "Acesso não autorizado para obter informações de processo.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro ao recuperar os processos.");
            }
        }

        private double GetCpuUsage(Process process)
        {
            try
            {
                double totalProcessorTimeMs = process.TotalProcessorTime.TotalMilliseconds;
                double processLifetimeMs = (DateTime.Now - process.StartTime).TotalMilliseconds;
                double cpuUsagePercent = (totalProcessorTimeMs / processLifetimeMs) * 100;

                return cpuUsagePercent;
            }
            catch
            {
                return 0;
            }
        }
    }
}

