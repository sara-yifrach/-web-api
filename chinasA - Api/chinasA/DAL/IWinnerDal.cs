using chinasA.Models;

namespace chinasA.DAL
{
    public interface IWinnerDal
    {

        public Task<List<Winner>> getAllWinners();

    }
}
