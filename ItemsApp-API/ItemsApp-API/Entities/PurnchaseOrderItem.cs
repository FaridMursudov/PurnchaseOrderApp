using System.ComponentModel.DataAnnotations.Schema;

namespace ItemsApp_API.Entities
{
    public class PurnchaseOrderItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        [ForeignKey("PurnchaseOrder")]
        public int PurnchaseOrderId { get; set; }
        public PurnchaseOrder PurnchaseOrder { get; set; }
    }
}
