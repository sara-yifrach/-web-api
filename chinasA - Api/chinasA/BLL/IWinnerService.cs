using chinasA.Models;

namespace chinasA.BLL
{
    public interface IWinnerService
    {
        public Task<List<Winner>> getAllWinners();
    }
}
