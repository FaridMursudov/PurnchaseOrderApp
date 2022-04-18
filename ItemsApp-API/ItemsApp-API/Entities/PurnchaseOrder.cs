using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ItemsApp_API.Entities
{
    public class PurnchaseOrder : IHasCreationDate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? SupmitterUser { get; set; }
        public DateTime  CreationDate { get; set; }
        public DateTime? SubmittedDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public List<PurnchaseOrderItem> PurnchaseOrderItems { get; set; }

        [NotMapped]
        public double TotalPrice
        {
            get
            {
                if (PurnchaseOrderItems is null) return 0;
                return PurnchaseOrderItems.Sum(x => x.Price);
            }
        }
    }
}
