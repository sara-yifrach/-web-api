using chinasA.DAL;
using chinasA.Models;

namespace chinasA.BLL
{
    public class WinnerService : IWinnerService
    {
        private readonly IWinnerDal winnerDal;
        public WinnerService(IWinnerDal winnerDal)
        {
            this.winnerDal = winnerDal;
        }
        public async Task<List<Winner>> getAllWinners()
        {
            return await winnerDal.getAllWinners();
        }
    }
}
