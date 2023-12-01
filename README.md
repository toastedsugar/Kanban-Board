
I had originally created my own drag and drop application by following the DnD-kit documentation documenteation; however, it had a bunch of issues including animations not being being rendered correctly, draggable lists not being implemented at all, and an overall janky unfinished feeling. I couldnt allow myself to allow it to be deployed to the public, so I decided to start over with help from a tutorial. 

My biggest issue was that I had overcomplicated my data structure too much, with each list owning it's cards and forcing expensive rerenders every time a card would hover over something else and by having arrays within arrays. The tutorial on the other hand simplified everything by having the Lists and Cards being stored in separate data structures and containing ID fields to reference each other, similarl to an SQL database. 


Drag and drop assistance provided by: https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton

