import networkx as nx
from collections import deque
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt


def html_to_dom_tree(root):
    labels = {}
    node_id = 1
    q = deque()
    graph = nx.Graph()

    q.appendleft({'element': root, "root_id": node_id})

    while len(q):
        node = q.pop()

    if node and node['element'].name == "body":
      graph.add_node(node_id, element=node['element'].name)
      node_id += 1

    root_id = node['root_id']
    labels[root_id] = node['element'].name

    for t in node['element'].contents:
      if t and t.name:
        graph.add_node(node_id, element=t.name)
        graph.add_edge(root_id, node_id)
        q.appendleft({"element": t, "root_id": node_id})
        node_id += 1
    return graph


test = '<html></html>'
graph = html_to_dom_tree(BeautifulSoup(open('a.html', encoding='utf-8'), 'lxml'))
# nx.draw(graph)
# plt.show()


a = '<span style="font-size:18px;"><span style="font-size:14px;">'
subpath_track = {}

def generate_subpaths(path, l):
  if l == len(path):
    if tuple(path) not in subpath_track:
      subpath_track[tuple(path)] = 1
    else:
      subpath_track[tuple(path)] += 1
  else:
    index = 0
    while l+index-1 < len(path):
      if tuple(path[index: l+index]) not in subpath_track:
        subpath_track[tuple(path[index: l+index])] = 1
      else:
        subpath_track[tuple(path[index: l+index])] += 1
      index += 1

    generate_subpaths(path, l+1)


def get_subpaths(graph, root, track, path):
  track[root] = True

  if graph.degree(root) == 1:
    generate_subpaths(path, 1)
  else:
    for node in graph.neighbors(root):
      if node not in track:
        get_subpaths(graph, node, track, path + [node, ])


def kernel_subpath(t1, t2, common_track):
  kernel_v = 0
  for p in subpath_track:
    kernel_v += common_track[t1][p]*common_track[t2][p]
  return kernel_v

kernel_v = kernel_subpath(graph, graph,graph)
print(kernel_v)
