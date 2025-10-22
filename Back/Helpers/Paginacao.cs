namespace Api.Helpers
{
    
    public class Paginacao<T>
    {
        public List<T> Itens { get; private set; }
        public int TotalItens { get; private set; }
        public int PaginaAtual { get; private set; }
        public int ItensPorPagina { get; private set; }
        public int TotalPaginas => (int)Math.Ceiling((double)TotalItens / ItensPorPagina);

        public Paginacao(List<T> itens, int totalItens, int itensPorPagina, int paginaAtual)
        {
            Itens = itens;
            TotalItens = totalItens;
            ItensPorPagina = itensPorPagina;
            PaginaAtual = paginaAtual;
        }
    }
}
