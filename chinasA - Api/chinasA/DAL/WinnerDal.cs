using chinasA.Models;

namespace chinasA.DAL
{
    public class WinnerDal : IWinnerDal
    {
        private readonly Context Context;
        public WinnerDal(Context Context)
        {
            this.Context = Context;
        }
        public async Task<List<Winner>> getAllWinners()
        {
            //List<Winner>= await C      
            return null;
                
        }
    }
}
